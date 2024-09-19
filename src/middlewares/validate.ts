import { NextFunction, Request, Response } from 'express';
import { Schema, ValidationError } from 'yup';

const validate = (schema: Schema, { stripUnknown = false } = {}) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = await schema.validate(
        {
          body: req.body,
          query: req.query,
          params: req.params,
        },
        { stripUnknown }
      );
      if (validated.body) req.body = validated.body;
      if (validated.query) req.query = validated.query;
      if (validated.params) req.params = validated.params;
      return next();
    } catch (e) {
      const error = e as ValidationError;
      return res.status(400).json({ success: false, type: error.name, message: error.message });
    }
  };
};

export default validate;
