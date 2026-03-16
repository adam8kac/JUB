import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import { EmployerData } from '../types/employer.type.js';
import { fileURLToPath } from 'url';
import env from 'dotenv';
env.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROTO_PATH = path.join(__dirname, '../protos/employer.proto');
const REGISTRY_ADDR = process.env.RPC_SERVICE_HOST ?? 'localhost:50051';
console.log('INFO: PROTO PATH: ', PROTO_PATH);
console.log('INFO: REGISTRY ADDRESS: ', REGISTRY_ADDR);

const pkgDef = protoLoader.loadSync(PROTO_PATH, {
  keepCase: false,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const proto = grpc.loadPackageDefinition(pkgDef) as any;

const EmployerServiceClient = proto.employer.EmployerService as any;
const client = new EmployerServiceClient(REGISTRY_ADDR, grpc.credentials.createInsecure());

export function checkRegisteredCompany(registrationNumber: string): Promise<EmployerData | null> {
  return new Promise((resolve, reject) => {
    client.GetByMaticna({ maticnaStevilka: registrationNumber }, (err: grpc.ServiceError | null, resp: any) => {
      if (err) return reject(err);

      const first = resp.result?.[0];
      if (!first) return resolve(null);

      const data: EmployerData = {
        fullName: first.popolnoIme,
        hseid: first.hseid,
        legalForm: first.pravnaOblika,
        registrationAuthority: first.registrskiOrgan,
        street: first.ulica,
        houseNumber: first.hisnaSt,
        houseNumberSuffix: first.hisnaStDodatek,
        settlement: first.naselje,
        postalCode: first.postaSt,
        city: first.posta,
        country: first.drzava,
      };

      resolve(data);
    });
  });
}
