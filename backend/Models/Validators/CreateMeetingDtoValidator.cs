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
            RuleFor(x => DateTime.Parse(x.MeetingDate))
                .NotNull()
                .GreaterThanOrEqualTo(DateTime.Now);
            RuleFor(x => x.UserId)
                .NotNull();
        }
    }
}
