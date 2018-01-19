import { Injectable } from "@angular/core";
import { LocalStorageService } from "angular-2-local-storage";

@Injectable()
export class StorageService {
    
    constructor(
        private localStorageService: LocalStorageService
    ) {
    }

    getItem(key: string) {
        return this.localStorageService.get(key);
    }

    setItem(key: string, value: any) {
        this.localStorageService.set(key, value);
    }

    removeItem(key: string) {
        this.localStorageService.remove(key);
    }
    
    getAll(): any {

        var keys = this.localStorageService.keys();
        var value = {};

        for (var i = 0; i < keys.length; i++) {
            value[keys[i]] = this.getItem(keys[i]);
        }

        return value;
    }

    clear() {
        this.localStorageService.clearAll();
    }

}