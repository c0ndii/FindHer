using FluentValidation;

namespace Find_H_er.Models.Validators
{
    public class CreateMeetingDtoValidator : AbstractValidator<CreateMeetingDto>
    {
        public CreateMeetingDtoValidator()
        {
            RuleFor(x => x.MeetingName)
                .NotEmpty()
                .MaximumLength(30);
            RuleFor(x => x.MeetingPlace)
                .NotNull()
                .MaximumLength(40);
            RuleFor(x => x.MeetingDate)
                .NotNull()
                .Must(BeValidDate);
            RuleFor(x => x.UserId)
                .NotNull();
        }

        private bool BeValidDate(string meetingDate)
        {
            if (!DateTime.TryParse(meetingDate, out DateTime parsedDate))
            {
                return false;
            }
            return parsedDate.Date >= DateTime.Today;
        }
    }
}
