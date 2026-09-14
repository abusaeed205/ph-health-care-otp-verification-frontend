export interface registrationPayload{
        name: string,
        email: string,
        password: string,
        patient: {
          contactNumber?: string,
        },
}


export interface LoginPayload{
        email: string,
        password: string
}

export interface verifyAccountPayload{
        email: string,
        otp: string
}

