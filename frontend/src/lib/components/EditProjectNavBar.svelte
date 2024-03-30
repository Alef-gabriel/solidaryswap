<script>

</script>

<style>
	#pic-basic{
		background-image: url("$lib/images/basics.png");
		background-position: center;
		background-size: cover;
		width: 26px;
		height: 26px;
	}

	#pic-people{
		background-image: url("$lib/images/people.png");
		background-position: center;
		background-size: cover;
		width: 26px;
		height: 26px;
	}

	#pic-story{
		background-image: url("$lib/images/story.png");
		background-position: center;
		background-size: cover;
		width: 26px;
		height: 26px;
	}
</style>

<div class="top-0 w-full h-24 bg-white flex shadow items-center justify-center">
	<div class="flex flex-col w-1/6 gap-1 items-center hover:border-b-2 border-violet-600">
		<a href="/edit/basics" class="flex flex-col items-center hover:no-underline">
			<div id="pic-basic"></div>
			<p class="text-lg text-gray-600">Basics</p>
		</a>
	</div>
	<div class="flex flex-col w-1/6 gap-1 items-center hover:border-b-2 border-violet-600">
		<a href="/edit/story" class="flex flex-col items-center hover:no-underline">
			<div id="pic-story"></div>
			<p class="text-lg text-gray-600">Story</p>
		</a>
	</div>
	<div class="flex flex-col w-1/6 gap-1 items-center hover:border-b-2 border-violet-600">
		<a href="/edit/people" class="flex flex-col items-center hover:no-underline">
			<div id="pic-people"></div>
			<p class="text-lg text-gray-600">People</p>
		</a>
	</div>
</div>