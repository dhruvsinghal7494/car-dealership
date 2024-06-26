<script>
  import { register } from "../../auth.js";
  let email = "";
  let password = "";
  let role = "user";

  const handleSubmit = async () => {
    await register(email, password, role);
  };
</script>

<main class="min-h-screen flex items-center justify-center">
  <form on:submit|preventDefault={handleSubmit} class="w-full max-w-md">
    <div>
      <label>Email</label>
      <input type="email" bind:value={email} class="input" />
    </div>
    <div>
      <label>Password</label>
      <input type="password" bind:value={password} class="input" />
    </div>
    <div>
      <label>Role</label>
      <select bind:value={role} class="input">
        <option value="user">User</option>
        <option value="dealership">Dealership</option>
      </select>
    </div>
    <button type="submit" class="btn">Register</button>
  </form>
</main>

<style>
  .input {
    width: 100%;
    padding: 8px;
    margin: 4px 0;
    border: 1px solid #ccc;
  }

  .btn {
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
  }
</style>
