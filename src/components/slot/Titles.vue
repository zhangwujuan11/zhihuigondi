<template>
	<div class="titlel">
		 <template>
			<div class="titletext">
			   <slot name="nametext">投资</slot>
			</div>
		</template>
	</div>
</template>

<script>
</script>

<style scoped>
	.titlel{
		width: 100%;
		padding: 0 0.9vw;
		height: 100%;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		color: white;
		font-size: 0.83333vw;
	}
	
	.titletext{
		width: 98%;
		height: 1.666666vw;
		line-height: 1.666666vw;
		background: url("~@/assets/image/synthesize/tlename.png") no-repeat;
		background-size: 100% 100%;
		padding-left:10px;
		box-sizing: border-box;
		margin-top: -20px;
	}
	.contont{
		width: 98%;
	}
</style>