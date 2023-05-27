$(document).ready(function() {
  $("#file-upload-form").submit(function(e) {
    e.preventDefault();

    var fileInput = $("#file-input")[0];
    var truong = $("#input-truong").val();
    var subject = $("#input-subject").val();

    if (fileInput.files.length > 0) {
      var file = fileInput.files[0];
      var reader = new FileReader();
      reader.onload = function(e) {
        var content = e.target.result;

        var accessToken = ""; // Thay YOUR_ACCESS_TOKEN bằng Access Token của bạn
        var owner = "ThanggA7"; // Thay YOUR_GITHUB_USERNAME bằng tên người dùng GitHub của bạn
        var repo = "Sharetailieu"; // Thay YOUR_REPO_NAME bằng tên kho lưu trữ GitHub của bạn

        var path = `${truong}/${subject}`;

        var apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

        $.ajax({
          url: apiUrl,
          type: "PUT",
          headers: {
            Authorization: "Bearer " + accessToken
          },
          data: JSON.stringify({
            message: "Upload file",
            content: btoa(content)
          }),
          success: function(response) {
            $("#result").html("<div class='alert alert-success'>File uploaded successfully.</div>").fadeIn();
            $("#file-upload-form")[0].reset();

            // Hiển thị thông tin tệp đã tải lên trong bảng
            var date = new Date(response.commit.committer.date);
            var dateString = date.toLocaleDateString();

            var tableRow = `<tr>
                              <td>${truong}</td>
                              <td>${dateString}</td>
                              <td>${file.name}</td>
                              <td><a href="https://github.com/${owner}/${repo}/blob/main/${path}?raw=true" target="_blank">Download</a></td>
                            </tr>`;

            // Gửi thông tin tệp đã tải lên về trang index
            window.opener.postMessage({ type: "fileUpload", data: tableRow }, "*");
          },
          error: function(error) {
            $("#result").html("<div class='alert alert-danger'>Error uploading file: " + error.statusText + "</div>").fadeIn();
          }
        });
      };
      reader.readAsBinaryString(file);
    }
  });
});
