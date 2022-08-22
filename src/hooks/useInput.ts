import { ChangeEvent, useState } from 'react';

type IValueType = string | number;

interface IProps {
  initalValue?: IValueType;
  validator?: (value: IValueType) => boolean;
}

const useInput = function ({ initalValue, validator }: IProps = {}) {
  const [value, setValue] = useState<IValueType>(initalValue || '');
  const [valid, setValid] = useState(false);

  const onChange = function (e: ChangeEvent<HTMLInputElement>) {
    const {
      target: { value },
    } = e;

    if (typeof validator === 'function') {
      setValid(validator(value));
    }

    if (!valid) {
      setValue(value);
    }
  };

  return {
    attr: {
      value,
      onChange,
    },
    utils: {
      valid,
      setValue,
      setValid,
    },
  };
};

export default useInput;
