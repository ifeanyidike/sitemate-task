import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Issue } from './issue';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  private apiUrl = 'http://localhost:3000/issues';
  http = inject(HttpClient)
  constructor() { }

  getIssues(){
    return this.http.get<Issue[]>(this.apiUrl).pipe(catchError(this.handleError))
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error(error));
  }
 

  getIssue(id: string){
    return this.http.get<Issue>(`${this.apiUrl}/${id}`)
  }

  createIssue(issue: Issue){
    return this.http.post(this.apiUrl, issue)
  }

  updateIssue(issue: Issue){
    return this.http.put(`${this.apiUrl}/${issue._id}`, issue)
  }

  deleteIssue(id: string){
    return this.http.delete(`${this.apiUrl}/${id}`)
  }
}
