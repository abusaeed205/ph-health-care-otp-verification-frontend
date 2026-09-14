import z from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, "Password Must Minimum 8 Characters Long.")
    .regex(/[a-z]/, "Password must contain at least 1 Lowercase Letter")
    .regex(/[A-Z]/, "Password must contain at least 1 Uppercase Letter")
    .regex(/[0-9]/, "Password must contain at least 1 Number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least 1 Special Character",
    ),
});


export const patientRegistrationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.email(),
  password: z
    .string()
    .min(8)
    .max(20)
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain at least one special character",
    }),
	// শর্ত হলো যদি empty String হয় তাহলে Error দিবে না || ভুল নাম্বার দিলে Error আসবে 
  contactNumber: z.string()
  .refine((val) => val === "" || /^(?:\+?880|0)1[3-9]\d{8}$/.test(val), {
    message: "please provide valid Bangladeshi number",
  })
  .optional(),
  confirmPassword: z.string().min(1, "please confirm your password"),
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "password do not match",
    path: ["confirmPassword"],
  });


// export const patientRegistrationSchema= z.object({
// 	name: z.string().min(2, "Name must be at least 2 characters long"),
// 	email: z.email(),
// 	password: z
// 		.string()
// 		.min(8)
// 		.max(20)
// 		.regex(/[A-Z]/, {
// 			message: "Password must contain at least one uppercase letter",
// 		})
// 		.regex(/[a-z]/, {
// 			message: "Password must contain at least one lowercase letter",
// 		})
// 		.regex(/[0-9]/, { message: "Password must contain at least one number" })
// 		.regex(/[^A-Za-z0-9]/, {
// 			message: "Password must contain at least one special character",
// 		}),
//     contactNumber: z.string()
// 	.regex(/^(\+880/0) 1[3-9]\d(8)$/)
// 	.optional(),
//     confirmPassword: z.string().min(1, "please confirm your password")
// })
// .refine((data)=>data.password===data.confirmPassword,{
// 	message:"password do not match",
// 	path:["confirmPassword"]
// })