import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { wards } from "../data/mockData";
import { generateId } from "../utils/helpers";
import Button from "../components/Button";
import { useToast } from "../context/ToastContext";

const emptyForm = {
  name: "",
  age: "",
  gender: "Female",
  ward: wards[0],
  doctor: "",
  status: "stable",
};

export default function AddPatient() {
  const { addPatient } = useOutletContext();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Patient name is required.";
    if (!form.age || Number(form.age) <= 0) nextErrors.age = "Enter a valid age.";
    if (!form.doctor.trim()) nextErrors.doctor = "Attending doctor is required.";
    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const newPatient = {
      id: generateId(),
      ...form,
      age: Number(form.age),
      admitted: new Date().toISOString().slice(0, 10),
      vitals: { heartRate: 80, bp: "120/80", temp: 98.6, spo2: 98 },
      notes: "New admission — initial assessment pending.",
    };

    addPatient(newPatient);
    addToast(`${newPatient.name} admitted to ${newPatient.ward}.`, { type: "success" });
    navigate(`/app/patients/${newPatient.id}`);
  };

  return (
    <section aria-labelledby="add-patient-heading">
      <div className="page-heading">
        <h1 id="add-patient-heading">Admit a new patient</h1>
        <p>Fill in the basic intake details. Vitals can be updated afterward.</p>
      </div>

      <form className="panel form-panel" onSubmit={handleSubmit} noValidate>
        <div className="form-row">
          <div className="field">
            <label htmlFor="name">Full name</label>
            <input id="name" name="name" value={form.name} onChange={handleChange} />
            {errors.name && <p className="field-error">{errors.name}</p>}
          </div>

          <div className="field">
            <label htmlFor="age">Age</label>
            <input
              id="age"
              name="age"
              type="number"
              min="0"
              value={form.age}
              onChange={handleChange}
            />
            {errors.age && <p className="field-error">{errors.age}</p>}
          </div>
        </div>

        <div className="form-row">
          <div className="field">
            <label htmlFor="gender">Gender</label>
            <select id="gender" name="gender" value={form.gender} onChange={handleChange}>
              <option>Female</option>
              <option>Male</option>
              <option>Other</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="ward">Ward</label>
            <select id="ward" name="ward" value={form.ward} onChange={handleChange}>
              {wards.map((w) => (
                <option key={w}>{w}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="field">
            <label htmlFor="doctor">Attending doctor</label>
            <input id="doctor" name="doctor" value={form.doctor} onChange={handleChange} />
            {errors.doctor && <p className="field-error">{errors.doctor}</p>}
          </div>

          <div className="field">
            <label htmlFor="status">Initial status</label>
            <select id="status" name="status" value={form.status} onChange={handleChange}>
              <option value="stable">Stable</option>
              <option value="attention">Needs attention</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </div>

        <Button type="submit" variant="primary">
          Admit patient
        </Button>
      </form>
    </section>
  );
}
