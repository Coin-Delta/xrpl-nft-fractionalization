import { create as ipfsHttpClient } from "ipfs-http-client";
import { Buffer } from "buffer";
const projectId = process.env.REACT_APP_INFURA_PROJECT_ID;
const projectSecret = process.env.REACT_APP_INFURA_PROJECT_SECRET;
const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

export const FileUpload = async (file) => {
  const client = await ipfsHttpClient({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    headers: {
      authorization: auth,
    },
  });

  const UploadtoIPFS = async (file) => {
    // const subdomain = 'https://offero.infura-ipfs.io/';
    try {
      const added = await client.add({ content: file });
      console.log("added...", added);
      const URL = `ipfs://${added.path}`;
      return URL;
    } catch (error) {
      console.log("Error uploading file to IPFS.", error);
    }
  };

  const result = await UploadtoIPFS(file);
  console.log("result", result);
  return result;
};

export const convertToImage = async (uri) => {
  try {
    if (uri.includes("ipfs://")) {
      console.log(process.env.REACT_APP_IPFS_BASEPATH + uri.split("ipfs://")[1])
      return process.env.REACT_APP_IPFS_BASEPATH + uri.split("ipfs://")[1];
    }

  } catch (error) {
    console.log(error)
    console.log("Error Convert IPFS to file.", error);
  }
};
