import { Injectable } from '@angular/core';
import { Storage } from '@angular/fire/storage';
import { from, Observable, switchMap } from 'rxjs'; 
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {
  
  private storageInstance: Storage;

  constructor(private storage: Storage) {
    this.storageInstance = getStorage();
  }

  uploadImage(image: File, path: string): Observable<string> {
    const storageReference = storageRef(this.storageInstance, path);
    const uploadTask = from(uploadBytes(storageReference, image));
    return uploadTask.pipe(switchMap(() => getDownloadURL(storageReference)));
  }
}
