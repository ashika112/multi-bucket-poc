import { useState } from "react";
import "./App.css";

import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import { copy, uploadData } from "aws-amplify/storage";

Amplify.configure(outputs);
console.log(Amplify.getConfig());

function App() {
  const [status, setStatus] = useState<string | null>(null);

  return (
    <>
      <h1>Multi-bucket React</h1>
      <div className="card">
        <button
          onClick={() => {
            try {
              const task = uploadData({
                path: "media/abc1.txt",
                data: "hello world",
                options: {
                  bucket: { bucketName: "bucket-2", region: "us-west-2" },
                },
              });
              task.result.then((res: any) => setStatus(res.path));
            } catch (e) {
              console.log("amplify", e);
            }
          }}
        >
          Upload
        </button>

        <button
          onClick={async () => {
            try {
              const res = await copy({
                source: {
                  path: "media/abc.txt",
                  bucket: "default",
                },
                destination: {
                  path: "media/abcCOpy-1.txt",
                  bucket: "default-1",
                },
              });
              console.log("copy", res);
            } catch (e) {
              // const error: StorageError = e;
              console.log(e);
            }
          }}
        >
          copy
        </button>
        <p>{status}</p>
      </div>
    </>
  );
}

export default App;
