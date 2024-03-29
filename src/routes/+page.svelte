<script>
  import MainNavBar from "$lib/components/MainNavBar.svelte";
</script>

<MainNavBar isOnEditPage={false} homePage={true}/>
<div class="header flex flex-col items-center justify-center">
  <div class="flex flex-col items-center text-white">
    <h2 class="h2">Discover, and collect</h2>
    <h1 class="h1"><strong>extraordinary</strong> Projects</h1>
    <p class="lead">Marketplace For Projects Tokens</p>
  </div>
</div>
<div class="bg-violet-50" id="features">
  <div class="pt-4 pb-4">
    <div class="row gx-5 a">
      <div class="col-lg-4 mb-5 mb-lg-0 flex-col section">
        <div class="rounded-3 mb-3 icon bg-primary">
          <div class="bi bi-wallet2 text-4xl"></div>
        </div>
        <h2 class="h4 fw-bolder">Set Up Your Wallet</h2>
      </div>
      <div class="col-lg-4 mb-5 mb-lg-0 section">
        <div class="feature bg-gradient text-white rounded-3 mb-3 icon">
          <div class="bi bi-building text-4xl"></div>
        </div>
        <h2 class="h4 fw-bolder">Add Your project</h2>
      </div>
      <div class="col-lg-4 section">
        <div
          class="feature bg-gradient text-white rounded-3 mb-3 icon bg-warning"
        >
          <div class="bi bi-grid text-4xl"></div>
        </div>
        <h2 class="h4 fw-bolder">List Them For Sale</h2>
      </div>
    </div>
  </div>
</div>

<style>
  .header {
    background-image: url("$lib/images/eth.png");
    background-position: center;
    background-size: cover;
    height: 73vh;
  }

  strong {
    color: transparent;
    text-shadow: 2px 2px 1px white;
  }
  .section {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    width: 4rem;
    background-color: purple;
    border-radius: 0.313rem;
  }
</style>
