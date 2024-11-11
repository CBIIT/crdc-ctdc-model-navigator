import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { MDFReader } from 'mdf-reader';
import ModelNavigator, { loadMDF } from './components/ModelNavigator';

const mdf_urls = [
  'https://raw.githubusercontent.com/CBIIT/ctdc-model/refs/heads/master/model-desc/ctdc_model_file.yaml',
  'https://raw.githubusercontent.com/CBIIT/ctdc-model/refs/heads/master/model-desc/ctdc_model_properties_file.yaml',
];

// Load the ICDCconfig.json dynamically
async function fetchConfig() {
  try {
    const response = await fetch('/path/to/ICDCconfig.json'); // Update with actual path
    if (!response.ok) {
      throw new Error(`Error loading config: ${response.statusText}`);
    }
    const config = await response.json();
    return config;
  } catch (error) {
    console.error("Failed to load config:", error);
    return null;
  }
}

// Function to load the model
async function getModel() {
  return loadMDF(...mdf_urls);
}

// Main application component
function App() {
  const [config, setConfig] = useState(null);
  const [model, setModel] = useState(null);

  useEffect(() => {
    // Fetch the config and model on component mount
    async function initialize() {
      const loadedConfig = await fetchConfig();
      if (loadedConfig) {
        setConfig(loadedConfig);
        
        // Apply parse hooks from config if available
        loadedConfig.mdfParseHooks.forEach((func) => {
          MDFReader.add_parse_hook(func);
        });
        
        // Load the model after config is set
        const loadedModel = await getModel();
        setModel(loadedModel);
      }
    }
    
    initialize();
  }, []);

  if (!config || !model) {
    return <div>Loading...</div>; // Show loading state until config and model are ready
  }

  return (
    <React.StrictMode>
      <ModelNavigator model={model} customConfig={config} />
    </React.StrictMode>
  );
}

// Render the application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
