<template>
  <div>
    <el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <p>
      使用
      <code>before-upload</code> 限制用户上传的图片格式和大小。
    </p>
    <el-collapse>
      <el-collapse-item title="显示代码" name="1">
        <el-input
          type="textarea"
          :autosize="{ minRows: 25, maxRows: 4}"
          readonly
          placeholder="请输入内容"
          v-model="textarea2"
        ></el-input>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: "",
      textarea2: `
               <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>

                      <style>
                        .avatar-uploader .el-upload {
                          border: 1px dashed #d9d9d9;
                          border-radius: 6px;
                          cursor: pointer;
                          position: relative;
                          overflow: hidden;
                        }
                        .avatar-uploader .el-upload:hover {
                          border-color: #409EFF;
                        }
                        .avatar-uploader-icon {
                          font-size: 28px;
                          color: #8c939d;
                          width: 178px;
                          height: 178px;
                          line-height: 178px;
                          text-align: center;
                        }
                        .avatar {
                          width: 178px;
                          height: 178px;
                          display: block;
                        }
                      </style>

                      <script>
                        export default {
                          data() {
                            return {
                              imageUrl: ''
                            };
                          },
                          methods: {
                            handleAvatarSuccess(res, file) {
                              this.imageUrl = URL.createObjectURL(file.raw);
                            },
                            beforeAvatarUpload(file) {
                              const isJPG = file.type === 'image/jpeg';
                              const isLt2M = file.size / 1024 / 1024 < 2;

                              if (!isJPG) {
                                this.$message.error('上传头像图片只能是 JPG 格式!');
                              }
                              if (!isLt2M) {
                                this.$message.error('上传头像图片大小不能超过 2MB!');
                              }
                              return isJPG && isLt2M;
                            }
                          }
                        }
                      <\/script>
            `
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>
<style scoped>
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
</style>
