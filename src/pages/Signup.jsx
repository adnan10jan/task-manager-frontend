import { useState } from "react";
import { signup } from "../services/auth";

export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    await signup(form);
    alert("Signup successful");
  };

  return (
    <form onSubmit={submit}>
      <input placeholder="Username"
        onChange={(e)=>setForm({...form,username:e.target.value})} />
      <input placeholder="Email"
        onChange={(e)=>setForm({...form,email:e.target.value})} />
      <input placeholder="Password" type="password"
        onChange={(e)=>setForm({...form,password:e.target.value})} />
      <button>Signup</button>
    </form>
  );
}
