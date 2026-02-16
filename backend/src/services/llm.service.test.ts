/// <reference types="node" />
import llm = require('./llm.service');

async function test() {
  const originalFetch = global.fetch;
  const mockResponse = {
    ok: true,
    json: async () => ({
      choices: [{ text: 'Tailored Resume Content' }]
    }),
    statusText: 'OK'
  };

  // @ts-ignore
  global.fetch = async (url: any, init: any) => {
    console.log(`Fetch called with URL: ${url}`);
    if (init) {
      console.log(`Method: ${init.method}`);
      console.log(`Headers: ${JSON.stringify(init.headers)}`);
      console.log(`Body: ${init.body}`);
    }
    return mockResponse;
  };

  try {
    const jd = "Software Engineer Job Description";
    const baseResume = { name: "John Doe", skills: ["Java"] };
    const roleContext = { role: "Senior Engineer" };
    const apiKey = "test-api-key";

    const result = await llm.generateTailoredResume(jd, baseResume, roleContext, apiKey);
    console.log("Result:", result);

    if (result === 'Tailored Resume Content') {
      console.log("Test Passed!");
    } else {
      console.error("Test Failed: Unexpected result");
      process.exit(1);
    }
  } catch (error) {
    console.error("Test Failed with error:", error);
    process.exit(1);
  } finally {
    global.fetch = originalFetch;
  }
}

test();
