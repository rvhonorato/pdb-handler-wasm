import "./App.css";
import { useState, useEffect } from "react";

import { PdbHandlerApi, default as init } from "pdb-handler-wasm";

function App() {
  const [wasmApi, setWasmApi] = useState<PdbHandlerApi | undefined>();
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(
    () => {
      async function loadWasm() {
        try {
          await init(); // initialize the WASM module
          const api = new PdbHandlerApi(); // create an instance of the the pdb handler api
          setWasmApi(api); // set the api in state
          setLoading(false);
        } catch (error) {
          console.error("Failed to initialize WASM:", error);
          setLoading(false);
        }
      }

      loadWasm();
    },
    // NOTE: Mind the empty dependency array here, this will
    //  avoid an infinite loop of re-initializations of the wasm module
    [],
  );

  const handleGreet = () => {
    if (wasmApi) {
      const result = wasmApi.say_hello(name);
      setGreeting(result);
    }
  };

  return (
    <div className="container">
      <h1>PDB Handler WASM Demo</h1>
      {loading ? (
        <p>Loading WebAssembly module...</p>
      ) : wasmApi ? (
        <div className="demo-section">
          <code>WebAssembly module loaded!</code>
          <div className="input-group">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
            <button onClick={handleGreet}>Greet</button>
          </div>
          {greeting && (
            <div className="result">
              <h3>Result:</h3>
              <p>{greeting}</p>
            </div>
          )}
        </div>
      ) : (
        <p className="error">
          Failed to load WebAssembly module, check console for details
        </p>
      )}
    </div>
  );
}

export default App;
