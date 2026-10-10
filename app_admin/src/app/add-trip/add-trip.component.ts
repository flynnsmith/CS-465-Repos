import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { TripDataService } from '../services/trip-data.service';

@Component({
    selector: 'app-add-trip',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    templateUrl: './add-trip.component.html',
    styleUrl: './add-trip.component.css'
})
export class AddTripComponent implements OnInit {
    addForm!: FormGroup;
    submitted = false;
    errorMessage = '';

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private tripDataService: TripDataService
    ) {}

    ngOnInit(): void {
        this.addForm = this.formBuilder.group({
            code: ['', Validators.required],
            name: ['', Validators.required],
            length: ['', Validators.required],
            start: ['', Validators.required],
            resort: ['', Validators.required],
            perPerson: ['', [Validators.required, Validators.min(0)]],
            image: ['', Validators.required],
            description: ['', Validators.required]
        });
    }

    get f() {
      return this.addForm.controls;
    }

    onSubmit(): void {
      this.submitted = true;
      this.errorMessage = '';

      if (this.addForm.invalid) {
        return;
      }

      this.tripDataService.addTrip(this.addForm.value).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.errorMessage = 'Unable to add trip.';
          console.error(error);
        }
      });
    }
}