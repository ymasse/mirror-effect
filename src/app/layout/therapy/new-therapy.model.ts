/**
 * @name NewTherapy
 * @description This class represent the definition of an Exercise object.
 *
 * @author Yanick Masse
 */
export class NewTherapy {

  // Participant properties
  /**
   * Identify the therapist in charge of this therapy
   */
  public therapist: string;

  /**
   * Identify the patient to targetted by the therapy.
   */
  public patient: string;

  /**
   * Identify the language of the therapy.
   */
  public language: string;

  /**
   * Indicate the face paralyzed side of the patient from his perspective.
   */
  public paralyzedSide: string;

  // Therapy definition.
  /**
   * Number of time the therapy must be executed each day by the patient.
   */
  public dailyFrequency: number = 2;

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
   * Date at which the therapy must start
   */
  public startDate: Date;

  // TODO: Validate if we should block the access to the therapy after the end date is passed
  /**
   * Date at which the therapy must end.
   */
  public endDate: Date;


  /**
   * List of exercise selected in this therapy.
   */
  public exercises: string[];

  /**
   * Note for the therapist
   */
  public notes: string;

  /**
   * True if the therapy is complete.
   */
  public completed: boolean;


  /**
   * True if the therapy is published.
   */
  public published: boolean;
}
