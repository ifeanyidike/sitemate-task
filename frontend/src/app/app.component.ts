import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IssueService } from './issue.service';
import { Issue } from './issue';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit  {
  title = 'Issues';
  issues: Issue[] = []

  issueService = inject(IssueService)
  constructor(){
  
  }

  onTitleChange(issueId: string, event: Event) {
    const issueIdx = this.issues.findIndex(issue => issue._id === issueId);
    if (issueIdx > -1) {
      const inputElement = event.target as HTMLInputElement;
      this.issues[issueIdx].title = (inputElement.value);
    }
  }

  onDescriptionChange(issueId: string, event: Event) {
    const issueIdx = this.issues.findIndex(issue => issue._id === issueId);
    if (issueIdx > -1) {
      const textarea = event.target as HTMLTextAreaElement;
      this.issues[issueIdx].description = textarea.value;
    }
  }

  ngOnInit(){
    this.getIssues()
  }

  getIssues(){
    this.issueService.getIssues().subscribe((issues) => {
      this.issues = issues
      
    })
  }

  createIssue(){
    this.issueService.createIssue({title: 'New Issue', description: 'This is description for new issue', status: 'open'}).subscribe({
      next: (issue) => {
        console.log("New issue created:", issue)
        this.getIssues()
      },
      error: (error) => {
        console.error("Error creating issue:", error)
      }
    })
  }

  updateIssue(id: string) {
    const issue = this.issues.find(i => i._id === id);
    this.issueService.updateIssue(issue!).subscribe({
      next: (issue) => {
        console.log("Issues updated:", issue)
        this.getIssues()
      },
      error: (error) => {
        console.error("Error creating issue:", error)
      }
    });
  }

  deleteIssue(id: string) {
    this.issueService.deleteIssue(id).subscribe(() => {
      this.getIssues();
    });
  }
}
