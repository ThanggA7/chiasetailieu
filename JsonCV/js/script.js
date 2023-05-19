$(document).ready(function() {
  // Show content when a tab is clicked
  $('a[data-toggle="pill"]').on('shown.bs.tab', function(e) {
    var target = $(e.target).attr("href");
    $(target).addClass("show active");
    $(target).siblings().removeClass("show active");
  });

  // Receive file upload information from admin page
  window.addEventListener("message", function(event) {
    if (event.data && event.data.type === "fileUpload") {
      var tableRow = event.data.data;
      var contentId = $(event.data.data).find("td:first").text();

      // Kiểm tra xem cột hàng đã tồn tại hay chưa
      if ($("#content-" + contentId).length > 0) {
        $("#content-" + contentId + " table").append(tableRow);
      } else {
        // Thêm tab mới và cột hàng mới
        var navLink = `<li class="nav-item">
                        <a class="nav-link" id="nav-${contentId}" data-toggle="pill" href="#content-${contentId}">
                          ${contentId}
                        </a>
                      </li>`;

        var content = `<div id="content-${contentId}" class="content tab-pane fade">
                          <h3>Trường: ${contentId}</h3>
                          <table>
                            <tr>
                              <th>Trường</th>
                              <th>Ngày Thi</th>
                              <th>Tải về</th>
                              <th>Link thi online</th>
                            </tr>
                            ${tableRow}
                          </table>
                        </div>`;

        $(".nav-pills").append(navLink);
        $(".tab-content").append(content);
      }
    }
  });
});
