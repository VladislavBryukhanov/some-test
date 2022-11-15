const fakeLogger = console.warn;

export const handleError = (res, error) => {
  if (error.name === 'ValidationError') {
    let errors = {};

    Object.keys(error.errors).forEach((key) => {
      errors[key] = error.errors[key].message;
    });

    return res.status(400).send(errors);
  }

  fakeLogger(error);
  res.status(500).send("Something went wrong");
}
