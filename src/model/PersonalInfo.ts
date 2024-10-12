export class PersonalInfo {
    name: string;
    age: number;
    contactInformation: {
      phoneNumber: string;
      personalEmail: string;
      universityEmail: string;
    };
  
    constructor(
      name: string,
      age: number,
      phoneNumber: string,
      personalEmail: string,
      universityEmail: string
    ) {
      this.name = name;
      this.age = age;
      this.contactInformation = {
        phoneNumber,
        personalEmail,
        universityEmail
      };
    }
  }