import { Component } from '@angular/core';

@Component({
  selector: 'app-stu-video-tutorial',
  templateUrl: './stu-video-tutorial.component.html',
  styleUrl: './stu-video-tutorial.component.css'
})
export class StuVideoTutorialComponent {

  tutorials = [
    {
      name: 'Intro to Angular',
      thumbnail: 'assets/images/angular-thumbnail.jpg',
      description: 'Learn the basics of Angular framework to build dynamic web applications.',
      videoUrl: 'https://www.example.com/tutorial1'
    },
    {
      name: 'JavaScript Fundamentals',
      thumbnail: 'assets/images/javascript-thumbnail.jpg',
      description: 'Understand the core concepts of JavaScript for web development.',
      videoUrl: 'https://www.example.com/tutorial2'
    },
    {
      name: 'CSS for Beginners',
      thumbnail: 'assets/images/css-thumbnail.jpg',
      description: 'A complete guide to CSS for designing beautiful web pages.',
      videoUrl: 'https://www.example.com/tutorial3'
    },
    {
      name: 'React Basics',
      thumbnail: 'assets/images/react-thumbnail.jpg',
      description: 'Get started with React and learn how to build interactive UIs.',
      videoUrl: 'https://www.example.com/tutorial4'
    },
    {
      name: 'Node.js and Express',
      thumbnail: 'assets/images/nodejs-thumbnail.jpg',
      description: 'Learn server-side development with Node.js and Express.',
      videoUrl: 'https://www.example.com/tutorial5'
    },
    // More tutorials...
  ];

  // Function to handle viewing a tutorial
  viewTutorial(tutorial: any) {
    window.open(tutorial.videoUrl, '_blank');
  }

}
