import { BlobServiceClient } from "@azure/storage-blob";
import axios from 'axios';
import { urlAPI } from "./constants";

export default class BlobStorage {

    containerClient: any;

    constructor() {
        //var blobSasUrl = "";
        const blobSasUrl = 'https://soafiles.blob.core.windows.net/files?sp=racwdl&st=2021-04-30T21:44:27Z&se=2021-06-16T05:44:27Z&sv=2020-02-10&sr=c&sig=kpTVVN2JZryg0FrW4fxWmFURSo0yUbkVtZZrS4e2dws%3D';
        var blobServiceClient;

        axios.get(urlAPI + 'object').then(
            response => {
              console.log(response.data);
              blobSasUrl = response.data;
              blobServiceClient = new BlobServiceClient(blobSasUrl);
              this.containerClient = blobServiceClient.getContainerClient("");
            }
        );
    }

    uploadFiles = async (files: any, response: any) => {

        try {
            const promises = [];
            for (const file of files) {
                const blockBlobClient = this.containerClient.getBlockBlobClient(file.name);
                promises.push(blockBlobClient.uploadBrowserData(file));
            }
            response(await Promise.all(promises));
        }
        catch (error) {
            response(error.message);
        }
    }

}
