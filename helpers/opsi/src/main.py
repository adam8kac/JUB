import requests
import pandas as pd
import grpc
from concurrent import futures
import employer_pb2
import employer_pb2_grpc
import time
from datetime import datetime, time as dtime
import threading


DOWNLOAD_FROM = "https://podatki.gov.si/dataset/9ee1a9aa-c224-4995-b2ad-3760d7af0748/resource/beb70929-3d0d-41c6-9af2-25d525d906d3/download/opsiprs.csv"
FILE_NAME = "./register_podjetij.csv"
TARGET_FILE_UPDATE_CHECK = dtime(hour=00, minute=00)
df_glob = None

has_run_today = False


class Downloader:
    def download_csv(self, url=DOWNLOAD_FROM):
        response = requests.get(url)

        if response.status_code == 200:
            response.encoding = "utf-16"
            text = response.text

            with open(FILE_NAME, "w", encoding="utf-8") as csv_fw:
                csv_fw.write(text)
                csv_fw.flush()
                csv_fw.close()

            print("Data saved to", FILE_NAME)
            return True
        else:
            print(
                "Failed to retrieve data from the API. Status code:",
                response.status_code,
            )
            return False


def refresh_df():
    global df_glob
    df_glob = pd.read_csv(
        "./register_podjetij.csv", sep=",", dtype=str, encoding="utf-8"
    )
    print("INFO: CSV REFRESHED")


def safe_str(value):
    if pd.isna(value):
        return ""
    return str(value)


class Employer:
    def filter(self, maticna_stevilka=None):
        df = df_glob
        filtered_result = df[df["Matična številka"] == (str)(maticna_stevilka)]
        return filtered_result


class EmployerService(employer_pb2_grpc.EmployerServiceServicer):
    def __init__(self):
        self.emp = Employer()

    def GetByMaticna(self, request, context):
        print("GOT REQUEST: \n", request, "\n-----------------\nCONTEXT: ", context)
        try:
            df = self.emp.filter(request.maticna_stevilka)
            results = []

            for _, row in df.iterrows():
                results.append(
                    employer_pb2.Employer(
                        maticna_stevilka=safe_str(row["Matična številka"]),
                        popolno_ime=safe_str(row["Popolno ime"]),
                        hseid=safe_str(row["HSEID"]),
                        pravna_oblika=safe_str(row["Pravnoorganizacijska oblika"]),
                        registrski_organ=safe_str(row["Registrski organ"]),
                        ulica=safe_str(row["Ulica"]),
                        hisna_st=safe_str(row["Hišna št "]),
                        hisna_st_dodatek=safe_str(row["Hišna št  dodatek"]),
                        naselje=safe_str(row["Naselje"]),
                        posta_st=safe_str(row["Poštna št "]),
                        posta=safe_str(row["Pošta"]),
                        drzava=safe_str(row["Država"]),
                    )
                )

            print("RESULT: ", results)

            return employer_pb2.EmployerResponse(result=results)

        except Exception as e:
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details(str(e))
            return employer_pb2.EmployerResponse()


def scheduler():
    has_run_today = False
    while True:
        now = datetime.now()
        if now.hour == 0 and now.minute == 0:
            has_run_today = False
        if not has_run_today and now.time() >= TARGET_FILE_UPDATE_CHECK:
            if Downloader().download_csv():
                refresh_df()
            has_run_today = True
        time.sleep(3600)


def serve_grpc():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    employer_pb2_grpc.add_EmployerServiceServicer_to_server(EmployerService(), server)
    server.add_insecure_port("0.0.0.0:50051")
    server.start()
    server.wait_for_termination()


if __name__ == "__main__":
    if Downloader().download_csv():
        refresh_df()
    else:
        raise RuntimeError("CSV download failed")
    print("INFO: RUNNING SERVER")
    threading.Thread(target=scheduler, daemon=True).start()
    serve_grpc()
