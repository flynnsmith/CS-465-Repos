import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './edit-trip.component.html',
  styleUrl: './edit-trip.component.css'
})
export class EditTripComponent implements OnInit {
  editForm!: FormGroup;
  tripCode = '';
  submitted = false;
  loading = true;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private tripDataService: TripDataService
  ) {}

  ngOnInit(): void {
    this.tripCode =
      this.route.snapshot.paramMap.get('tripCode') || '';

    this.editForm = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', [Validators.required, Validators.min(0)]],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });

    if (!this.tripCode) {
      this.router.navigate(['/']);
      return;
    }

    this.tripDataService.getTrip(this.tripCode).subscribe({
      next: (trip: Trip) => {
        this.editForm.patchValue({
          ...trip,
          start: trip.start
            ? String(trip.start).substring(0, 10)
            : ''
        });

        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Unable to retrieve trip.';
        this.loading = false;
        console.error(error);
      }
    });
  }

  public onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';

    if (this.loading || this.editForm.invalid) {
      return;
    }

    this.tripDataService.updateTrip(
      this.tripCode,
      this.editForm.value
    ).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.errorMessage = 'Unable to update trip.';
        console.error(error);
      }
    });
  }
}