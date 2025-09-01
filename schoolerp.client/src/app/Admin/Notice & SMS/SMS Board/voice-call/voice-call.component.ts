import { Component } from '@angular/core';

@Component({
  selector: 'app-voice-call',
  templateUrl: './voice-call.component.html',
  styleUrl: './voice-call.component.css'
})
export class VoiceCallComponent {

  // Placeholder for form data
  voiceCallData = {
    template: '',
    templateId: '',
    language: 'english',
    message: '',
    messageTo: ''
  };

  // Handle form submission
  sendVoiceCall() {
    console.log('Voice Call Sent:', this.voiceCallData);
    // Logic for sending voice call (use Angular service to interact with backend)
  }

  // Verify Template Function
  verifyTemplate() {
    // Logic to verify template content (e.g., call API to validate)
    alert("Template verified successfully!");
  }

  // Check Voice Call Balance Function
  checkBalance() {
    // Logic to check balance for voice calls (API call)
    alert("Balance checked successfully!");
  }

}
