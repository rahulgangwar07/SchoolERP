import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewProfileComponent } from './Admin/Profile/view-profile/view-profile.component';
import { UpdateProfileModalComponent } from './Admin/Profile/update-profile-modal/update-profile-modal.component';
import { FacultySideBarComponent } from './Layout/faculty-side-bar/faculty-side-bar.component';
import { FooterComponent } from './Layout/footer/footer.component';
import { HeaderComponent } from './Layout/header/header.component';
import { MainLayoutComponent } from './Layout/main-layout/main-layout.component';
import { NotFoundComponent } from './Layout/not-found/not-found.component';
import { SidebarComponent } from './Layout/sidebar/sidebar.component';
import { StudentSideBarComponent } from './Layout/student-side-bar/student-side-bar.component';
import { LoginComponent } from './login/login.component';
import { StuClassWorkComponent } from './Student/Acedmics L.M.S/stu-class-work/stu-class-work.component';
import { StuCurriculumComponent } from './Student/Acedmics L.M.S/stu-curriculum/stu-curriculum.component';
import { StuDailyNotesComponent } from './Student/Acedmics L.M.S/stu-daily-notes/stu-daily-notes.component';
import { StuEContentComponent } from './Student/Acedmics L.M.S/stu-e-content/stu-e-content.component';
import { StuHomeWorkComponent } from './Student/Acedmics L.M.S/stu-home-work/stu-home-work.component';
import { StuSelfLearningMaterialComponent } from './Student/Acedmics L.M.S/stu-self-learning-material/stu-self-learning-material.component';
import { StuStudyMaterialComponent } from './Student/Acedmics L.M.S/stu-study-material/stu-study-material.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewProfileComponent,
    UpdateProfileModalComponent,
    FacultySideBarComponent,
    FooterComponent,
    HeaderComponent,
    MainLayoutComponent,
    NotFoundComponent,
    SidebarComponent,
    StudentSideBarComponent,
    LoginComponent,
    StuClassWorkComponent,
    StuCurriculumComponent,
    StuDailyNotesComponent,
    StuEContentComponent,
    StuHomeWorkComponent,
    StuSelfLearningMaterialComponent,
    StuStudyMaterialComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
