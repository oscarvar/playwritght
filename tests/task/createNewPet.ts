import { APIRequestContext } from "@playwright/test";

export class CreateNewPet{

    private request : APIRequestContext

    constructor(request: APIRequestContext){
        this.request = request
        
    }
}