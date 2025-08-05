import {z} from "zod";

const optionsSchema = z
    .object({
        list: z.array(z.string()).optional().default([]),
    })
    .optional()
    .default({list: []});

const inputSchema = z.object({
    name: z.string(),
    input_type: z.string(),
    description: z.string(),
    required: z.boolean(),
    options: optionsSchema,
});

export const applicationSchema = z.object({
    id: z.string(),
    name: z.string(),
    type: z.string(),
    status: z.string(),
    inputs: z.array(inputSchema),
    created_at: z.string(),
    updated_at: z.string(),
    last_deployed_at: z.string(),
});

// UI
export const LoginMetaDataSchema = z.object({
    allowDirectPasswordLogin: z.boolean(),
    allowUserCreation: z.boolean(),
    confirmed: z.boolean(),
    exists: z.boolean(),
    hasSaml: z.boolean(),
    invited: z.boolean(),
    passwordSet: z.boolean(),
    valid: z.boolean(),
});

export type LoginMetaData = z.infer<typeof LoginMetaDataSchema>;
