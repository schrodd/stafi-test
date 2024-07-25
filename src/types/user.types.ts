export enum UserGenders {
  MALE = "male",
  FEMALE = "female",
}

export interface UserData {
  gender: UserGenders
  name: {
    first: string
    last: string
  }
  location: {
    street: {
      number: number
      name: string
    }
    city: string
    state: string
    country: string
  }
  email: string
}
