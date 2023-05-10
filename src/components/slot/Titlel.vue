<template>
	<div class="titlel">
		 <template>
			<div class="titletext">
			   <slot name="nametext">梁片列表</slot>
			</div>
		</template>
		<template>
			<div class="contont">
			   <slot name="contont"></slot>
			</div>
		</template>
	</div>
</template>

<script>
</script>

<style scoped>
	.titlel{
		width: 100%;
		padding: 0 1.45833vw;
		/* height: 100%; */
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		color: white;
	}
	.titlel::before {
	    content: "";
	    display: block;
	    width: 100%;
	    height: 43px;
		background: url("~@/assets/image/synthesize/tle.png") no-repeat;
		background-size: 100% 100%;
	}
	.titlel::after {
	    content: "";
	    display: block;
	    width: 100%;
	    height: 43px;
		background: url("~@/assets/image/synthesize/panel-item-bottom-full.png") no-repeat;
		background-size: 100% 100%;
	}
	.titletext{
		width: 98%;
		height: 42px;
		line-height: 42px;
		background: url("~@/assets/image/synthesize/tlename.png") no-repeat;
		background-size: 100% 100%;
		padding-left: 20px;
		box-sizing: border-box;
		margin-top: -20px;
	}
	.contont{
		width: 98%;
	}
</style>