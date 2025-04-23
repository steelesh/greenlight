<script lang="ts">

  import "$styles/reset.css";
  import "$styles/global.css";
  import "$styles/fonts.css";
  import Footer from "$lib/components/footer.svelte";
  import Navbar from "$lib/components/navbar.svelte";
</script>

<Navbar />
<main>
  <slot />
</main>
<Footer />
