import { useCallback, useState } from 'react'

type FieldErrors<T> = Partial<Record<keyof T, string>>

export const useForm = <T extends Record<string, unknown>>(
  initialValues: T,
  validate: (values: T) => FieldErrors<T>,
) => {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<FieldErrors<T>>({})
  const [apiError, setApiError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, type, value, checked } = event.target
      setValues((previous) => ({
        ...previous,
        [name]: type === 'checkbox' ? checked : value,
      }))
      setApiError(null)
      if (errors[name as keyof T]) {
        setErrors((previous) => {
          const next = { ...previous }
          delete next[name as keyof T]
          return next
        })
      }
    },
    [errors],
  )

  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setApiError(null)
    setIsSubmitting(false)
  }, [initialValues])

  const handleSubmit = useCallback(
    (onValid: (values: T) => Promise<void> | void) =>
      async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const validation = validate(values)

        if (Object.keys(validation).length > 0) {
          setErrors(validation)
          setApiError(null)
          return
        }

        setErrors({})
        setApiError(null)
        setIsSubmitting(true)

        try {
          await onValid(values)
        } catch (error) {
          const message =
            error instanceof Error ? error.message : 'Submission failed.'
          setApiError(message)
        } finally {
          setIsSubmitting(false)
        }
      },
    [validate, values],
  )

  return {
    values,
    setValues,
    errors,
    setErrors,
    apiError,
    setApiError,
    isSubmitting,
    handleChange,
    handleSubmit,
    reset,
  }
}
