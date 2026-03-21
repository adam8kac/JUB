package com.jub.hub;

import com.jub.hub.repository.InboxEntryRepository;
import com.jub.hub.repository.JobPostingRepository;
import org.junit.jupiter.api.Test;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.data.r2dbc.R2dbcDataAutoConfiguration;
import org.springframework.boot.autoconfigure.data.r2dbc.R2dbcRepositoriesAutoConfiguration;
import org.springframework.boot.autoconfigure.r2dbc.R2dbcAutoConfiguration;
import org.springframework.boot.autoconfigure.r2dbc.R2dbcTransactionManagerAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

@SpringBootTest(properties = {
		"jwt.secret=testSecretKeyForTestingPurposesOnly123456",
		"pdf-generator.base-url=http://localhost:3001"
})
@EnableAutoConfiguration(exclude = {
		R2dbcAutoConfiguration.class,
		R2dbcTransactionManagerAutoConfiguration.class,
		R2dbcDataAutoConfiguration.class,
		R2dbcRepositoriesAutoConfiguration.class
})
class HubApplicationTests {

	@MockBean
	JobPostingRepository jobPostingRepository;

	@MockBean
	InboxEntryRepository inboxEntryRepository;

	@Test
	void contextLoads() {
	}

}
