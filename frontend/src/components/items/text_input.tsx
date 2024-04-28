interface TextInputProps {
  label: string;
  value: string;
  placeholder: string;
  changer: JSX.ChangeEventHandlerUnion<HTMLInputElement, Event>;
}

import { JSX } from "solid-js";
import guidGenerator from "../../utils/id";

export default function TextInput(params: TextInputProps) {
  const { label, value, placeholder, changer } = params;
  const id = `text-input-${guidGenerator()}`;
  return (
    <div class="sm:col-span-4 mt-2">
      <label for={id} class="block text-sm font-medium leading-6 text-gray-300">
        {label}
      </label>
      <div class="mt-2">
        <div class="flex shadow-sm ring-1 ring-inset ring-gray-600 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 rounded-none">
          <input
            type="text"
            value={value}
            id={id}
            class="block flex-1 border-0 bg-transparent py-1.5 pl-3 placeholder:text-gray-300 focus:ring-0 sm:text-sm sm:leading-6 rounded-none"
            placeholder={placeholder}
            onChange={changer}
          />
        </div>
      </div>
    </div>
  );
}

export type { TextInputProps };
