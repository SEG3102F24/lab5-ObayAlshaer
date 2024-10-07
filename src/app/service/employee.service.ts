import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, CollectionReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';
import { DocumentData } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeesRef: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore) {
    // Initialize the reference to the 'employees' collection
    this.employeesRef = collection(this.firestore, 'employees') as CollectionReference<DocumentData>;
  }

  async addEmployee(employee: Employee): Promise<void> {
    // Use addDoc to add a new employee
    const docRef = await addDoc(this.employeesRef, employee);
    console.log('Document written with ID: ', docRef.id);
    // Optionally, you can return the ID or perform other actions here
  }

  getEmployees(): Observable<Employee[]> {
    return collectionData(this.employeesRef) as Observable<Employee[]>; // Get real-time updates
  }
}
