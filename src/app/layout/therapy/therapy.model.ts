import { TherapyActor } from './therapy-actor.model';
import { Exercise } from './../exercises/exercise.model';

/**
 * @name Therapy
 * @description This class represent the definition of an Exercise object.
 *
 * @author Yanick Masse
 */
export class Therapy {

  public _id?: string;
  // Participant properties
  /**
   * Identify the therapist in charge of this therapy
   */
  public therapist: TherapyActor;

  /**
   * Identify the patient to targetted by the therapy.
   */
  public patient: TherapyActor;

  /**
   * Indicate the face paralyzed side of the patient from his perspective.
   */
  public paralyzedSide: Sides;

  // Therapy definition.
  /**
   * Number of time the therapy must be executed each day by the patient.
   */
  public dailyFrequency: number = 2;

  /**
   * Date at which the therapy must start
   */
  public startDate: Date;

  // TODO: Validate if we should block the access to the therapy after the end date is passed
  /**
   * Date at which the therapy must end.
   */
  public endDate: Date;

  /**
   * Duration of each exercise in second
   */
  public singleExerciseDuration: number = 3;

  /**
   * Pause between each exercise repetition
   */
  public delayBetweenExercise: number = 5;

  /**
   * Number of repetition of each exercise.
   */
  public numberOfRepetition: number = 5;

  /**
   * List of exercise selected in this therapy.
   */
  public exercises: Exercise[];

  /**
   * Note for the therapist
   */
  public notes: string;

  /**
   * True if the therapy is complete.
   */
  public completeStatus: boolean;

   /**
   * Identify the language of the therapy.
   */
  public language: string;

  // Admin properties
  /**
   * Date at which the therapy was created.
   */
  public created_at?: string;

  /**
   * Date at which the therapy instance was last modified.
   */
  public updated_at?: string;
  
  /**
   * User id that created the therapy
   */
  public createdBy: string; 

}

export enum Sides {
  Left = <any>"Left",
  Right = <any>"Right"
}
