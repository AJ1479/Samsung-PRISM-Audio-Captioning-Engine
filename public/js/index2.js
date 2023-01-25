$(".option").click(function () {
  if (!$(this).hasClass("active")) {
    if ($(this).hasClass("option2")) {
      $(".iframe1").removeClass("invisible");
    } else {
      if ($(".iframe1").hasClass("invisible")) {
      } else {
        $(".iframe1").addClass("invisible");
      }
    }

    if ($(this).hasClass("option3")) {
      $(".iframe2").removeClass("invisible");
    } else {
      if ($(".iframe2").hasClass("invisible")) {
      } else {
        $(".iframe2").addClass("invisible");
      }
    }
  }

  $(".option").removeClass("active");
  $(this).addClass("active");

  $(".visible").each(function () {
    if ($(this).parent().hasClass("active")) {
      if ($(this).hasClass("invisible")) $(this).removeClass("invisible");
    } else {
      $(this).addClass("invisible");
    }
  });
});

function triggerClick() {
  if (document.form.file.value == "") {
    alert("Please provide audio file!");
    document.form.file.focus();
    return false;
  }
  $(".submit").click();
}
