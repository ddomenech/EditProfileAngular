import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProfileService } from '../profile.service';
import { UserProfile } from '../_models';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userProfile: UserProfile;
  profileForm: FormGroup;
  passwordForm: FormGroup;
  loading = false;
  submited = false;
  file: File;

  constructor(
    private profile: ProfileService,
    private formbuilder: FormBuilder,
    private cd: ChangeDetectorRef
    ) {}

  ngOnInit() {
    this.profile.getProfile().pipe(first()).subscribe(profile => {
      this.userProfile = profile[0];
      this.profileForm = this.formbuilder.group({
        email: [this.userProfile.email],
        name: [this.userProfile.name],
        first_name: [this.userProfile.first_name],
        last_name: [this.userProfile.last_name],
        file: [null]
      });
    });
    this.passwordForm = this.formbuilder.group({
      oldpassword: ['', Validators.required],
      newpassword: ['', Validators.required]
    });
    this.profileForm = this.formbuilder.group({
      email: [''],
      name: [''],
      first_name: [''],
      last_name: ['']
    });
  }
  onFileChange(event) {
    const reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.file= event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.profileForm.patchValue({
          file: reader.result
       });
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
        console.log(reader.result);
      };
    }
  }

  get form() { return this.profileForm.controls; }

  get fpass() { return this.passwordForm.controls; }
  onSubmit() {
    this.submited = true;
    this.userProfile.name = this.form.name.value;
    this.userProfile.email = this.form.email.value;
    this.userProfile.first_name = this.form.first_name.value;
    this.userProfile.last_name = this.form.last_name.value;

    this.profile.updateProfile(this.userProfile, this.file)
      .pipe(first()).subscribe(
        profile => {
          this.userProfile = profile;
        },
        error => {
        });
  }

  changePassword() {
    const oldpassword = this.fpass.oldpassword.value;
    const newpassword = this.fpass.newpassword.value;
    this.profile.changePassword(this.userProfile, oldpassword, newpassword)
      .pipe(first()).subscribe(data => {
        alert(data.data);
      });
  }
}
