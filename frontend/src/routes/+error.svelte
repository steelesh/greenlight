<script>
  import { page } from "$app/state";
</script>

<div class="error-container">
  <h1>Status {page.status}</h1>
  <p class="message">{page.error?.message}</p>
  <a href="/">Go back home</a>
</div>

<style>
  .error-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
    padding: 0 1rem;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .message {
    margin-bottom: 2rem;
    max-width: 600px;
    white-space: pre-wrap;
  }

  a {
    color: #4361ee;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
</style>
