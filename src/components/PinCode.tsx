import * as React from 'react';
import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

export interface PinCodeProps {
  length?: number;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  inputMode?: 'numeric' | 'tel';
  style?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  secure?: boolean;
  maskChar?: string;
  value?: string;
  defaultValue?: string;
}

export interface PinCodeRef {
  focus: () => void;
  clear: () => void;
  getValue: () => string;
}

const PinCode = forwardRef<PinCodeRef, PinCodeProps>(({
  length = 4,
  onChange,
  onComplete,
  disabled = false,
  placeholder = '○',
  inputMode = 'numeric',
  style,
  inputStyle,
  secure = false,
  maskChar = '•',
  value: controlledValue,
  defaultValue = '',
}, ref) => {
  const [values, setValues] = useState<string[]>(() => {
    const initialValue = controlledValue ?? defaultValue;
    return initialValue.split('').slice(0, length).concat(Array(Math.max(0, length - initialValue.length)).fill(''));
  });

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (controlledValue !== undefined) {
      const newValues = controlledValue.split('').slice(0, length)
        .concat(Array(Math.max(0, length - controlledValue.length)).fill(''));
      setValues(newValues);
    }
  }, [controlledValue, length]);

  useImperativeHandle(ref, () => ({
    focus: () => inputRefs.current[0]?.focus(),
    clear: () => {
      const newValues = Array(length).fill('');
      setValues(newValues);
      onChange?.('');
    },
    getValue: () => values.join('')
  }));

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index: number, value: string) => {
    if (disabled) return;

    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newValues = [...values];
    newValues[index] = value;
    // Only update internal state if not controlled
    if (controlledValue === undefined) {
      setValues(newValues);
    }

    const pinValue = newValues.join('');
    onChange?.(pinValue);

    if (pinValue.length === length) {
      onComplete?.(pinValue);
    } else if (value && index < length - 1) {
      // Move to next input
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !values[index] && index > 0) {
      // Move to previous input on backspace
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, length);
    if (!/^\d*$/.test(pastedData)) return;

    const newValues = Array(length).fill('');
    pastedData.split('').forEach((char, index) => {
      if (index < length) newValues[index] = char;
    });
    setValues(newValues);

    const pinValue = newValues.join('');
    onChange?.(pinValue);
    if (pinValue.length === length) {
      onComplete?.(pinValue);
    }

    // Focus the last filled input after pasting
    const lastFilledIndex = Math.min(pastedData.length - 1, length - 1);
    inputRefs.current[lastFilledIndex]?.focus();
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: '8px',
        ...style,
      }}
      role="group"
      aria-label="PIN code input"
    >
      {values.map((value, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type={secure ? "password" : "text"}
          inputMode={inputMode}
          pattern="[0-9]*"
          maxLength={1}
          value={value}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          disabled={disabled}
          placeholder={secure ? maskChar : placeholder}
          style={{
            width: '40px',
            height: '40px',
            textAlign: 'center',
            fontSize: '20px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            outline: 'none',
            ...inputStyle,
          }}
        />
      ))}
    </div>
  );
});

PinCode.displayName = 'PinCode';
export { PinCode };
