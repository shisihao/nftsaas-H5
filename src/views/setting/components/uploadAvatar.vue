<template>
	<van-uploader v-show="show" :after-read="afterRead" :max-count="count" :max-size="maxSize" :before-read="beforeRead" @oversize="onOversize" />
</template>

<script setup>
import { showToast } from 'vant'
import { ref, computed } from 'vue'
import axios from 'axios'
import { OssKey, getToken } from '@/utils/auth'
import COS from 'cos-js-sdk-v5'
import store from '@/store/index'

let info = computed(() => store.state.user.info)

const props = defineProps({
	show: {
		type: Boolean,
		default:false
	},
	refName: {
		type: String,
		default: `upload${String(+new Date()) + Math.random().toString(36).substring(2)}`
	},
	count: {
		type: String,
		default:'1'
	},
	maxSize: {
		type:Number,
		default: 2 * 1024 * 1024
	}
})

const emit = defineEmits(['handleBeforeUpload','handleSuccess'])

const afterRead = file => {
	const oss = JSON.parse(getToken(OssKey)) 

	const cos = new COS({
    SecretId: oss.credentials.tmpSecretId,
    SecretKey: oss.credentials.tmpSecretKey,
    SecurityToken: oss.credentials.sessionToken
  })

	const filename = `${String(+new Date()) + Math.random().toString(36).substr(2)}.${file.file.name.split('.').pop()}`

	cos.putObject(
    {
    	Bucket: oss.bucket,
      Region: oss.region,
      Key: info.value.id + '/' + filename,
      Body: file.file,
      onProgress: function(progressData) {
        file.onProgress(progressData.percent)
      }
    },
    (err, data) => {
      if (err) {
        console.log(err)
        showToast('上传失败')
				store.dispatch('user/getOssKey')
      }
        if (data.statusCode === 200) {
          const newData = data.Location.split('/').splice(1).join('/')
					emit('handleSuccess',newData)
        } else {
					showToast('上传失败')
        }   
    }
  )
}

const onOversize = () => {
	showToast('文件大小不能超过 2M')
}

const beforeRead = file => {
	return new Promise((resolve, reject) => {
		emit(
			'handleBeforeUpload',
			file,
			res => {
				if (res) {
					resolve(file)
				} else {
					reject()
				}
			},
			props.refName
		)
	})
}

</script>

<style lang="scss" scoped></style>
