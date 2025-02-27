use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct PdbHandlerApi {}

#[wasm_bindgen]
impl PdbHandlerApi {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        PdbHandlerApi {}
    }

    pub fn say_hello(&self, name: String) -> String {
        format!("Hello {}", name)
    }
}
