import TextInput from "../text_input";
import { JSX, Setter } from "solid-js";
import type { CreateVillageRequest } from "../../../types/village";

interface CreateVillageProps {
  formData: CreateVillageRequest;
  setFormData: Setter<CreateVillageRequest>;
  formSubmit: JSX.EventHandlerUnion<
    HTMLFormElement,
    Event & { submitter: HTMLElement }
  >;
  formReset: () => void;
}

export default function CreateVillage(params: CreateVillageProps) {
  const { formData, setFormData, formSubmit, formReset } = params;
  return (
    <>
      <h2 class="text-xl font-bold">Create Village</h2>
      <div class="daisy-divider" />
      <form onSubmit={formSubmit}>
        <TextInput
          label="Village Name"
          placeholder="Some Village Name"
          value={formData.name}
          changer={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <div class="daisy-divider" />
        <div class="mt-3 flex justify-end">
          <input
            type="submit"
            class="daisy-btn daisy-btn-primary rounded-none daisy-btn-sm"
            value="Create Village"
          />
          <input
            type="reset"
            value="Cancel"
            class="daisy-btn daisy-btn-error rounded-none daisy-btn-sm ml-3"
            onClick={formReset}
          />
        </div>
      </form>
    </>
  );
}
