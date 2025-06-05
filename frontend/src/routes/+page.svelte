<script>
  import * as config from "$lib/config";
</script>

<svelte:head>
  <title>{config.title}</title>
  <meta name="description" content={config.description} />
</svelte:head>

<h1>Greenlight</h1>
<p>Movie Management Platform</p>
<a href="/register"><button>Register Now</button></a>
<a href="/movies"><button>Browse Movies</button></a>
