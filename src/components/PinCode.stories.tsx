import type { Meta, StoryObj } from '@storybook/react';
import { PinCode } from './PinCode';
import { useForm, Controller } from 'react-hook-form';
import React from 'react';

const meta = {
  title: 'Components/PinCode',
  component: PinCode,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PinCode>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    length: 4,
  },
};

export const CustomLength: Story = {
  args: {
    length: 6,
    placeholder: '•',
  },
};

export const Disabled: Story = {
  args: {
    length: 4,
    disabled: true,
    placeholder: '*',
  },
};

export const CustomStyle: Story = {
  args: {
    length: 4,
    style: { gap: '12px' },
    inputStyle: {
      width: '50px',
      height: '50px',
      fontSize: '24px',
      border: '2px solid #2196f3',
      borderRadius: '8px',
      backgroundColor: '#f5f5f5',
    },
  },
};

export const Secure: Story = {
  args: {
    length: 4,
    secure: true,
    maskChar: '●',
  },
};

export const WithReactHookForm: Story = {
  render: () => {
    const FormExample = () => {
      const { control, handleSubmit } = useForm({
        defaultValues: {
          pin: ''
        }
      });

      const onSubmit = (data: { pin: string }) => {
        alert(`Submitted PIN: ${data.pin}`);
      };

      return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="pin"
            control={control}
            rules={{ required: true, minLength: 4 }}
            render={({ field }) => (
              <PinCode
                length={4}
                value={field.value}
                onChange={field.onChange}
                ref={field.ref}
              />
            )}
          />
          <button 
            type="submit"
            style={{ 
              marginTop: '1rem',
              padding: '0.5rem 1rem',
              backgroundColor: '#2196f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Submit
          </button>
        </form>
      );
    };

    return <FormExample />;
  }
}; 