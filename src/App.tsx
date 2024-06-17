import { useState } from "react";
import "./App.css";

import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import { copy, uploadData } from "aws-amplify/storage";

// Amplify.configure({
//   Auth: {
//     Cognito: {
//       identityPoolId: "us-west-2:478c85b4-4406-44aa-a3c9-2121d85920f7",
//       allowGuestAccess: true,
//     },
//   },
//   Storage: { S3: { bucket: "bucket" } },
// });

Amplify.configure(outputs);

function App() {
  const [status, setStatus] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [bucket, setBucket] = useState<any>({});

  return (
    <>
      <h1>Multi-bucket React</h1>
      <div className="card">
        <button
          onClick={() => {
            const task = uploadData({
              path: "media/abc.txt",
              data: "hello world",
              options: { bucket: "multi-bucket-3", region: "us-west-2" },
            });
            task.result.then((res) => setStatus(res.path));
          }}
        >
          Upload
        </button>

        <button
          onClick={async () => {
            const res = await copy({
              source: { path: "media/abc.txt" },
              destination: {
                path: "media/abcCOpy.txt",
                bucket: { name: "multi-bucket-2", region: "us-east-2" },
              },
            });
            console.log("copy", res);
          }}
        >
          copy
        </button>
        {/* <button
          onClick={() => {
            const b = getBuckets();
            setBucket(b[1]);
            console.log(b);
          }}
        >
          Get Buckets
        </button> */}
        <p>{status}</p>
      </div>
    </>
  );
}

export default App;
